import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Livro } from "../models/livro";

@Injectable({
  providedIn: "root"
})

export class LivrosService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = "https://m7-livros-api-jq3k.onrender.com/api/livros"; // TODO

  listar(): Promise<Livro[]> {
    return firstValueFrom(
      this.http.get<Livro[]>(
        this.apiUrl
      )
    );
  }

  adicionar(livro: Livro) {
    return firstValueFrom(
      this.http.post<Livro>(
        this.apiUrl,
        livro
      )
    );
  }

  async buscarPorId(id: number): Promise<Livro | undefined> {
    try {
      return await firstValueFrom(
        this.http.get<Livro>(
          `${this.apiUrl}/${id}`
        )
      );
    } catch (erro) {
      if (erro instanceof HttpErrorResponse && erro.status === 404) {
        return undefined;
      }
      throw erro;
    }
  }
}
