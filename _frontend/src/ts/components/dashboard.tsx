import React, { useContext, useEffect, useState } from 'react';
import { RecentSalesView } from './views/recent-sales';
import { TopSalesView } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Header } from './views/header';
import { Sales, SalesConnnectorContext } from '../context/sales-connector';

const TOP_TIMEOUT = 60_000;
const RECENT_TIMEOUT = 30_000;

export const DashBoardView = () => {
	const { hub, store, sales, setSales } = useContext(SalesConnnectorContext)

	const [mode, setMode] = useState<'top' | 'recent'>('recent');

	useEffect(function initializeEventListeners() {
		// initialize callback
		const cb = async (e) => {
			const user = await store.getUser(e.userId)
			const product = await store.getProduct(e.productId)

			const duration = e.duration;
			const sale: Sales = { user, product, duration };

			setSales(prev => [...prev, sale])
		}

		hub.registerSalesEventListener(cb)
		return () => hub.unregisterSalesEventListener(cb)
	}, []);

	useEffect(function viewMode() {
		const IN_VIEW_TIMEOUT: number = mode === 'top' ? TOP_TIMEOUT : RECENT_TIMEOUT;

		const timeout = setTimeout(() => {
			setMode(prev => prev === 'top' ? 'recent' : 'top');
		}, IN_VIEW_TIMEOUT);

		return () => clearTimeout(timeout);
	}, [mode]);

	return (
		<>
			<div key={sales.length} className="flex-auto p-5">
				<Header />

				{mode === 'recent' ? <RecentSalesView /> : <TopSalesView />}

				<SplashModal />
			</div>
		</>
	)
}
