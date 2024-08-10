package org.acme.service;

import org.acme.model.Entry;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class EntryService extends AbstractService {

    @Inject
    DynamoDbClient dynamoDB;

    public List<Entry> findAll() {
        List<Entry> entries = dynamoDB.scanPaginator(scanRequest()).items().stream()
                .map(Entry::from)
                .collect(Collectors.toList());
        entries.sort((e1, e2) -> e1.getDate().compareTo(e2.getDate()));
        BigDecimal balance = new BigDecimal(0);
        for (Entry entry : entries) {
            balance = balance.add(entry.getAmount());
            entry.setBalance(balance);
        }
        return entries;
    }
    public List <Entry> findByCategory(String category) {
        List<Entry> entries = dynamoDB.scanPaginator(scanRequest()).items().stream()
                .map(Entry::from)
                .filter(entry -> entry.getCategory().equals(category))
                .collect(Collectors.toList());
        return entries;
    }
    public List<Entry> replaceCategory(String oldCategory, String newCategory) {
        List<Entry> entries = dynamoDB.scanPaginator(scanRequest()).items().stream()
                .map(Entry::from)
                .filter(entry -> entry.getCategory().equals(oldCategory))
                .collect(Collectors.toList());
        for (Entry entry : entries) {
            entry.setCategory(newCategory);
            dynamoDB.putItem(putRequest(entry));
        }
        return entries;
    }
    public List <Entry> findByAccountIDAndCategory(String accountID, String category) {
        List<Entry> entries = dynamoDB.scanPaginator(scanRequest()).items().stream()
                .map(Entry::from)
                .filter(entry -> entry.getAccountID().equals(accountID))
                .filter(entry -> entry.getCategory().equals(category))
                .collect(Collectors.toList());
        return entries;
    }
    public List <Entry> findByAccountID(String accountID) {
        List<Entry> entries = dynamoDB.scanPaginator(scanRequest()).items().stream()
                .map(Entry::from)
                .filter(entry -> entry.getAccountID().equals(accountID))
                .collect(Collectors.toList());
        entries.sort(Comparator.comparing(Entry::getDate));
        BigDecimal balance = new BigDecimal(0);
        for (Entry entry : entries) {
            balance = balance.add(entry.getAmount());
            entry.setBalance(balance);
        }
        return entries;
    }
    public List <Entry> findByAccountIDAndDates(String accountID, Long init, Long end) {
        List<Entry> entries = dynamoDB.scanPaginator(scanRequest()).items().stream()
                .map(Entry::from)
                .filter(entry -> entry.getAccountID().equals(accountID))
                .filter(entry -> entry.getTimestamp().longValue()>=init.longValue() && entry.getTimestamp().longValue()<=end.longValue())
                .collect(Collectors.toList());
        entries.sort(Comparator.comparing(Entry::getDate));
        BigDecimal balance = new BigDecimal(0);
        for (Entry entry : entries) {
            balance = balance.add(entry.getAmount());
            entry.setBalance(balance);
        }
        return entries;
    }
    public Entry findByTimestamp(Long timestamp) {
        return  Entry.from(dynamoDB.getItem(getRequest(timestamp.toString())).item());
    }

    public void addEntry(Entry entry) {
        Log.info("Adding entry " + entry);
        dynamoDB.putItem(putRequest(entry));
    }
}