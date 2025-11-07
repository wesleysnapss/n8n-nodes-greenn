import {
	IHttpRequestOptions,
	IExecuteFunctions,
	IHttpRequestMethods,
} from 'n8n-workflow';

export async function greennApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: any,
	qs?: any,
): Promise<any> {
	const credentials = await this.getCredentials('greennApi');
	const token = credentials.token as string;

	const options: IHttpRequestOptions = {
		method,
		url: `https://apiadm.greenn.com.br${endpoint}`,
		headers: {
			'accept': 'application/json, text/plain, */*',
			'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
			'authorization': `Bearer ${token}`,
			'origin': 'https://adm.greenn.com.br',
			'referer': 'https://adm.greenn.com.br/',
			'x-manual-host': 'adm.greenn.com.br',
		},
		json: true,
	};

	if (body) {
		options.body = body;
	}

	if (qs) {
		options.qs = qs;
	}

	try {
		return await this.helpers.httpRequest(options);
	} catch (error: any) {
		if (error.response) {
			const statusCode = error.response.status || 'Unknown';
			const statusText = error.response.statusText || 'Unknown';
			const errorBody = error.response.body || error.response.data || {};
			throw new Error(
				`Erro na API Greenn: ${statusCode} ${statusText} - ${JSON.stringify(errorBody)}`,
			);
		}
		throw error;
	}
}

