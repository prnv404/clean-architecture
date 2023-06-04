
// src/infrastructure/config/IOCContainer.ts
import { Container } from 'typedi';
import { ShoppingRepository } from '../usecase/repository/shopping.repository'; 
import { Shoppingimplement } from '../framework'; 

export function configureIOCContainer() {

    const container = Container;
    
    container.set<ShoppingRepository>(ShoppingRepository, new Shoppingimplement());

    return container;

}

