export interface Filme {
  //Interface tem como função padronizar a estrutura que irá comportar os dados, definindo seus atributos e tipos
   id?: number;//? significa que o atributo é opcional
   titulo: string;
   urlFoto?: string;
   dtLancamento: Date;
   descricao?: string;
   nota: number;
   urlIMDb?: string;
   genero: string;
}
