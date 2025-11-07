import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	greennApiRequest,
} from './GenericFunctions';

export class Greenn implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Greenn',
		name: 'greenn',
		icon: 'file:greenn.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interagir com a API da Greenn',
		defaults: {
			name: 'Greenn',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'greennApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create Product',
						value: 'createProduct',
						description: 'Criar um novo produto',
						action: 'Criar um produto',
					},
				],
				default: 'createProduct',
			},
			{
				displayName: 'Product Name',
				name: 'productName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createProduct'],
					},
				},
				default: '',
				description: 'Nome do produto',
			},
			{
				displayName: 'Product Description',
				name: 'productDescription',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['createProduct'],
					},
				},
				default: '',
				description: 'Descrição do produto',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['createProduct'],
					},
				},
				options: [
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
						},
						default: 0,
						description: 'Preço do produto',
					},
					{
						displayName: 'SKU',
						name: 'sku',
						type: 'string',
						default: '',
						description: 'Código SKU do produto',
					},
					{
						displayName: 'Category',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Categoria do produto',
					},
					{
						displayName: 'Stock',
						name: 'stock',
						type: 'number',
						default: 0,
						description: 'Quantidade em estoque',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'createProduct') {
					const productName = this.getNodeParameter('productName', i) as string;
					const productDescription = this.getNodeParameter('productDescription', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as {
						price?: number;
						sku?: string;
						category?: string;
						stock?: number;
					};

					const body: any = {
						name: productName,
						description: productDescription,
					};

					if (additionalFields.price !== undefined) {
						body.price = additionalFields.price;
					}
					if (additionalFields.sku) {
						body.sku = additionalFields.sku;
					}
					if (additionalFields.category) {
						body.category = additionalFields.category;
					}
					if (additionalFields.stock !== undefined) {
						body.stock = additionalFields.stock;
					}

					const responseData = await greennApiRequest.call(
						this,
						'POST',
						'/api/products',
						body,
					);

					returnData.push({
						json: responseData,
						pairedItem: {
							item: i,
						},
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

