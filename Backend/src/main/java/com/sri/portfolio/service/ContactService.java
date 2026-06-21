package com.sri.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sri.portfolio.model.Contact;
import com.sri.portfolio.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public Contact save(Contact contact) {
        return repository.save(contact);
    }

    public List<Contact> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}