
// src/infrastructure/config/IOCContainer.ts
import { Container } from 'typedi';
import { CustomerRepository } from '../usecase/repository/customer.repository'; 
import { CustomerRepositoryImpl } from '../framework'; 

export function IOCContainer() {

    const container = Container;
    
    container.set<CustomerRepository>(CustomerRepository, new CustomerRepositoryImpl());

    return container;

       
}

