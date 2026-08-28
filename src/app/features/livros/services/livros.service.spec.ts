import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { LivrosService } from "./livros.service";

describe("LivrosService", () => {
  let service: LivrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivrosService);
  });

  it("deve listar os livros", async () => {
    const livros = await service.listar();
    expect(livros).toHaveLength(3);
  });

  it("deve buscar um livro por id", async () => {
    const livro = await service.buscarPorId(1);
    expect(livro?.titulo)
      .toBe("Erro ao acessar sistema");
  });

  it("deve adicionar um novo livro", async () => {
    const antes = await service.listar();

    service.adicionar({
      id: 4,
      titulo: "A Odisséia",
      autor: "Homero",
      categoria: "Poema",
      ano: 2020,
      status: "disponivel",
      descricao: "Conto épico"
    });

    const depois = await service.listar();
    expect(depois.length).toBe(antes.length + 1);
  });
});
