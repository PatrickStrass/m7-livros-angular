import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Livro } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-livros-detalhe-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './livro-detalhe-page.html',
})

export class LivroDetalhePage implements OnInit {
  ngOnInit(): void {
    void this.carregar();
  }

  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(LivrosService);
  readonly livro = signal<Livro | undefined>(undefined);
  readonly carregando = signal(true);

  private async carregar(): Promise<void> {
    const id = Number(
      this.route.snapshot.paramMap.get("id")
    );
    const livro = await this.service.buscarPorId(id);
    this.livro.set(livro);
    this.carregando.set(false);
  }
}
