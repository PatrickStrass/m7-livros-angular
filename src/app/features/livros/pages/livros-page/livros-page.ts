import { inject, signal, computed, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LivrosService } from "../../services/livros.service";
import { Livro, StatusLivro } from "../../models/livro";
import { FiltroLivros } from "../../components/filtro-livros/filtro-livros";
import { ListaLivros } from "../../components/lista-livros/lista-livros";

@Component({
  selector: "app-livros-page",
  standalone: true,
  imports: [FiltroLivros, ListaLivros, FormsModule],
  templateUrl: "./livros-page.html"
})

export class LivrosPage implements OnInit {
  ngOnInit(): void {
    void this.carregarLivros();
  }

  private readonly livrosService = inject(LivrosService);
  readonly mostrarFormulario = signal(true);
  readonly livros = signal<Livro[]>([]);
  readonly pesquisa = signal("");
  readonly filtroStatus = signal<StatusLivro | "todos">("todos");
  readonly carregando = signal(false);
  readonly erro = signal<string | null>(null);

  readonly livrosFiltrados = computed(() => {
    const termo = this.pesquisa().trim().toLowerCase();
    const status = this.filtroStatus();

    return this.livros().filter(livro => {
      const correspondeTexto =
        termo === "" ||
        livro.titulo.toLowerCase().includes(termo) ||
        livro.descricao?.toLowerCase().includes(termo);
      const correspondeStatus =
        status === "todos" || livro.status === status;
      return correspondeTexto && correspondeStatus;
    });
  });

  novoLivro = {
    titulo: "",
    autor: "",
    categoria: "",
    ano: "",
    status: "disponivel" as StatusLivro,
    descricao: ""
  };

  async carregarLivros(): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      const dados = await this.livrosService.listar();
      this.livros.set(dados);
    } catch {
      this.erro.set("Não foi possível carregar os livros.");
    } finally {
      this.carregando.set(false);
    }
  }

  atualizarPesquisa(valor: string): void {
    this.pesquisa.set(valor);
  }

  atualizarStatus(
    valor: StatusLivro | "todos"
  ): void {
    this.filtroStatus.set(valor);
  }

  async salvarLivro() {
    const livroParaSalvar = {
      id: Math.floor(Math.random() * 10000),
      titulo: this.novoLivro.titulo,
      autor: this.novoLivro.autor,
      categoria: this.novoLivro.categoria,
      ano: Number(this.novoLivro.ano),
      status: this.novoLivro.status,
      descricao: this.novoLivro.descricao
    };

    this.livrosService.adicionar(livroParaSalvar);

    this.mostrarFormulario.set(false);
    this.novoLivro = {
      titulo: "",
      autor: "",
      categoria: "",
      ano: "",
      status: "disponivel",
      descricao: ""
    };

    this.carregarLivros();
  }
}
