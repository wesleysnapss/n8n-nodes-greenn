import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GreennApi implements ICredentialType {
	name = 'greennApi';
	displayName = 'Greenn API';
	documentationUrl = 'https://apiadm.greenn.com.br';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Token de autenticação do usuário',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://apiadm.greenn.com.br',
			url: '/api/identity-validation/status',
			method: 'GET',
			headers: {
				'accept': 'application/json, text/plain, */*',
				'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
				'origin': 'https://adm.greenn.com.br',
				'referer': 'https://adm.greenn.com.br/',
				'x-manual-host': 'adm.greenn.com.br',
			},
		},
	};
}

