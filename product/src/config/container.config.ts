
// src/infrastructure/config/IOCContainer.ts
import { Container } from 'typedi';
import { ProductRepository } from '../usecase/repository/product.repository'; 
import { ProductImplement } from '../frameworks'; 

export function configureIOCContainer() {

    const container = Container;
    
    container.set<ProductRepository>(ProductRepository, new ProductImplement());

    return container;

       
}

