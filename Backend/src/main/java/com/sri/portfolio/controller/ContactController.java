package com.sri.portfolio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.sri.portfolio.model.Contact;
import com.sri.portfolio.service.ContactService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public Contact save(
            @RequestBody Contact contact) {

        return service.save(contact);
    }

    @GetMapping
    public List<Contact> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}