import React, { useContext } from 'react';
import Table from '../widgets/table';
import { Card } from '../widgets/card';
import { Sales, SalesConnnectorContext } from '../../context/sales-connector';

interface RankedSale {
	position: number;
	userId: number;
	soldSum: number;
};

const findUserById = (rows: Sales[], id: number) => {
	return rows.find(sale => sale.user.id === id);
}

export const TopSalesView = (props) => {
	const { sales } = useContext(SalesConnnectorContext)
	const rows = [...sales]

	const soldSumByUserId = rows.reduce<Record<number, number>>((acc, sale) => {
		const id = sale.user.id;
		acc[id] = (acc[id] ?? 0) + sale.product.unitPrice;
		return acc;
	}, {});

	const rankedSales: RankedSale[] = [...Object.entries(soldSumByUserId)]
		.sort(([, sumA], [, sumB]) => sumB - sumA)
		.reduce<RankedSale[]>((acc, [userIdKey, soldSum], index) => {
			acc.push({
				position: index + 1,
				userId: Number(userIdKey),
				soldSum,
			});
			return acc;
		}, []);


	return (
		<Card {...props}>
			<Card.InsetBody>
				<Table>
					<Table.Headers>
						<Table.Header>Standing</Table.Header>
						<Table.Header>User</Table.Header>
						<Table.Header>Value</Table.Header>
					</Table.Headers>

					<Table.Body>
						{rankedSales.map(entry => (
							<Table.Row key={entry.userId} className={entry.position === 1 ? 'font-bold' : ''}>
								<Table.Cell>{entry.position}</Table.Cell>
								<Table.Cell>{findUserById(rows, entry.userId)?.user.name}</Table.Cell>
								<Table.Cell>{entry.soldSum.toFixed(2)}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Card.InsetBody>
		</Card>
	)
}
