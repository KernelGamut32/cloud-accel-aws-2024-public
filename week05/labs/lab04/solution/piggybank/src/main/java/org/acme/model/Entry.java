package org.acme.model;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Objects;

import org.acme.service.AbstractService;

import io.quarkus.runtime.annotations.RegisterForReflection;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

@RegisterForReflection
public class Entry {
    public Long timestamp;
    public String accountID;
    public String description;
    public String category;
    public BigDecimal amount;
    public BigDecimal balance;
    public String date;

    public Entry() {}

    public static Entry from(Map<String, AttributeValue> item) {
        Entry entry = new Entry();
        if (item != null && !item.isEmpty()) {
            entry.setAccountID(item.get(AbstractService.ENTRY_ACCOUNTID_COL).s());
            entry.setDescription(item.get(AbstractService.ENTRY_DESCRIPTION_COL).s());
            entry.setAmount(new BigDecimal(item.get(AbstractService.ENTRY_AMOUNT_COL).n()));
            entry.setBalance(new BigDecimal(item.get(AbstractService.ENTRY_BALANCE_COL).n()));
            entry.setDate(item.get(AbstractService.ENTRY_DATE_COL).s());
            entry.setTimestamp(Long.parseLong(item.get(AbstractService.ENTRY_TIMESTAMP).n()));
            entry.setCategory(item.get(AbstractService.ENTRY_CATEGORY).s());
        }
        return entry;
    }

    public String getAccountID() {
        return this.accountID;
    }

    public void setAccountID(String accountID) {
        this.accountID = accountID;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return this.amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getBalance() {
        return this.balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Entry)) {
            return false;
        }

        Entry other = (Entry) obj;

        return Objects.equals(other.accountID, this.accountID)
                && Objects.equals(other.description, this.description)
                && Objects.equals(other.amount, this.amount)
                && Objects.equals(other.balance, this.balance)
                && Objects.equals(other.date, this.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.timestamp);
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}