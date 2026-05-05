import React, { createContext, Dispatch, SetStateAction, useRef, useState } from 'react';
import { SalesEventHub } from '../services/messages';
import { EntityStore } from '../services/meta-store';
import { Product, User } from '../services/_private/db';

export interface Sales {
	user: User;
	product: Product;
	duration: number;
}

interface SalesConnnectorContextValue {
	hub: SalesEventHub;
	store: EntityStore;
	sales: Sales[];
	setSales: Dispatch<SetStateAction<Sales[]>>;
}

export const SalesConnnectorContext = createContext<SalesConnnectorContextValue>(null);

export const SalesConnnectorProvider = ({ children }) => {
	const hubRef = useRef<SalesEventHub | null>(null);
	const storeRef = useRef<EntityStore | null>(null);
	const [sales, setSales] = useState<Sales[]>([]);

	if (hubRef.current === null) {
		hubRef.current = new SalesEventHub();
		hubRef.current.connect();
		storeRef.current = new EntityStore();
	}

	return (
		<SalesConnnectorContext.Provider value={{ hub: hubRef.current, store: storeRef.current, sales, setSales }}>
			{children}
		</SalesConnnectorContext.Provider>
	)
}
