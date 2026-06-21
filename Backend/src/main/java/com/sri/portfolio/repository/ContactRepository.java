package com.sri.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sri.portfolio.model.Contact;

public interface ContactRepository
        extends JpaRepository<Contact, Long> {

}