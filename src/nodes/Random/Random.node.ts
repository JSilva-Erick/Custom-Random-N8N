import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    icon: 'file:icon.svg',
    group: ['transform'],
    version: 1,
    description: 'Gerador de números aleatórios usando random.org',
    defaults: {
      name: 'True Random Number Generator',
    },
    inputs: ['main'],
    outputs: ['main'],
    usableAsTool: true,
    properties: [
      {
        displayName: 'Valor Mínimo',
        name: 'numMin',
        type: 'number',
        default: 0,
        placeholder: 'Digite um número inteiro',
        description: 'Valor mínimo para o número aleatório',
        required: true,
      },
      {
        displayName: 'Valor Máximo',
        name: 'numMax',
        type: 'number',
        default: 100,
        placeholder: 'Digite um número inteiro',
        description: 'Valor máximo para o número aleatório',
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const returnData: INodeExecutionData[] = [];
    const items = this.getInputData();

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const min = this.getNodeParameter('numMin', itemIndex, 0) as number;
        const max = this.getNodeParameter('numMax', itemIndex, 100) as number;

        // 🔹 Validação se são números
        if (typeof min !== 'number' || isNaN(min)) {
          throw new Error(`O valor mínimo informado (${min}) não é um número válido. Digite um número inteiro.`);
        }
        if (typeof max !== 'number' || isNaN(max)) {
          throw new Error(`O valor máximo informado (${max}) não é um número válido.`);
        }

        // 🔹 Validação se min <= max
        if (min >= max) {
          throw new Error(
            `O valor mínimo (${min}) não pode ser maior ou igual ao valor máximo (${max}).`,
          );
        }

        const response = await this.helpers.httpRequest({
          url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
          method: 'GET',
          json: false,
        });

        const newItem: INodeExecutionData = {
          json: { ...items[itemIndex].json },
          pairedItem: {
            item: itemIndex,
          },
        };

        newItem.json.randomNumber = parseInt(response as string, 10);
        returnData.push(newItem);

      } catch (error) {
        if (this.continueOnFail()) {
          const errorMessage = (error as Error).message;
          const newItem = {
            json: {
              ...items[itemIndex].json,
              error: errorMessage,
            },
            pairedItem: {
              item: itemIndex,
            },
          };
          returnData.push(newItem);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
