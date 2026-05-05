import React, { useContext } from 'react';
import Table from '../widgets/table';
import { Card } from '../widgets/card';
import { SalesConnnectorContext } from '../../context/sales-connector';

const DISPLAY_LIMIT = 10;

export const RecentSalesView = () => {
	const { sales } = useContext(SalesConnnectorContext)

	const rows = [...sales]
		.slice(-DISPLAY_LIMIT)
		.reverse()

	return (
		<Card>
			<Card.InsetBody>
				<Table>
					<Table.Headers>
						<Table.Header>User</Table.Header>
						<Table.Header>Product</Table.Header>
						<Table.Header>Sale value</Table.Header>
					</Table.Headers>

					<Table.Body>
						{rows.map((sale) => (
							<Table.Row key={`${sale.user.id * sale.duration + Math.random()}`}>
								<Table.Cell>{sale.user.name}</Table.Cell>
								<Table.Cell>{sale.product.name}</Table.Cell>
								<Table.Cell>{sale.product.unitPrice}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Card.InsetBody>
		</Card>
	)
}
