import React, { useContext, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { SalesConnnectorContext } from '../../context/sales-connector';

const MAX_TOASTS = 1;
const AUTO_CLOSE = 5_000

export const SplashModal = () => {
	const { sales } = useContext(SalesConnnectorContext)

	const seenCountRef = useRef(sales.length);

	useEffect(() => {
		const newSales = sales.slice(seenCountRef.current);
		newSales.forEach(sale => {
			toast.success(`${sale.user.name} sold ${sale.product.name} for ${sale.duration} units`);
		});
		seenCountRef.current = sales.length;
	}, [sales.length]);

	return (
		<>
			<ToastContainer
				position="top-right"
				// limit={MAX_TOASTS}
				autoClose={AUTO_CLOSE}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				theme="light"
			/>
		</>
	)
}
