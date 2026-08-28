export type StatusLivro = "disponivel" | "alugado";

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  status: StatusLivro;
  descricao?: string;
}
