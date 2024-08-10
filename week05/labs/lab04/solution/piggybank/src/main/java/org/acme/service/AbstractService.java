package org.acme.service;

import java.util.HashMap;
import java.util.Map;

import org.acme.model.Entry;

import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;

public class AbstractService {

    public String accountID;
    public String description;
    public String amount;
    public String balance;
    public String date;

    public static final String ENTRY_ACCOUNTID_COL = "accountID";
    public static final String ENTRY_DESCRIPTION_COL = "description";
    public static final String ENTRY_AMOUNT_COL = "amount";
    public static final String ENTRY_BALANCE_COL = "balance";
    public static final String ENTRY_DATE_COL = "date";
    public static final String ENTRY_TIMESTAMP = "timestamp";
    public static final String ENTRY_CATEGORY = "category";

    public String getTableName() {
        return "finance";
    }

    protected ScanRequest scanRequest() {
        return ScanRequest.builder().tableName(getTableName())
                .attributesToGet(ENTRY_ACCOUNTID_COL, ENTRY_DESCRIPTION_COL, ENTRY_AMOUNT_COL, ENTRY_BALANCE_COL, ENTRY_DATE_COL, ENTRY_TIMESTAMP, ENTRY_CATEGORY).build();
    }

    protected PutItemRequest putRequest(Entry entry) {
        Map<String, AttributeValue> item = new HashMap<>();
        item.put(ENTRY_ACCOUNTID_COL, AttributeValue.builder().s(entry.getAccountID()).build());
        item.put(ENTRY_DESCRIPTION_COL, AttributeValue.builder().s(entry.getDescription()).build());
        item.put(ENTRY_AMOUNT_COL, AttributeValue.builder().n(entry.getAmount().toString()).build());
        item.put(ENTRY_BALANCE_COL, AttributeValue.builder().n(entry.getBalance().toString()).build());
        item.put(ENTRY_DATE_COL, AttributeValue.builder().s(entry.getDate()).build());
        item.put(ENTRY_TIMESTAMP, AttributeValue.builder().n(entry.getTimestamp().toString()).build());
        item.put(ENTRY_CATEGORY, AttributeValue.builder().s(entry.getCategory()).build());

        return PutItemRequest.builder()
                .tableName(getTableName())
                .item(item)
                .build();
    }

    protected GetItemRequest getRequest(String name) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put(ENTRY_ACCOUNTID_COL, AttributeValue.builder().s(name).build());

        return GetItemRequest.builder()
                .tableName(getTableName())
                .key(key)
                .attributesToGet(ENTRY_ACCOUNTID_COL, ENTRY_DESCRIPTION_COL, ENTRY_AMOUNT_COL, ENTRY_BALANCE_COL, ENTRY_DATE_COL, ENTRY_TIMESTAMP, ENTRY_CATEGORY)
                .build();
    }

}