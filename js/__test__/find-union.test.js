import { UnionFind } from "../generators/kruskal-generator";

test("is same classe", () => {
  const unionFind = new UnionFind();
  unionFind.add(0);
  unionFind.add(1);
  unionFind.add(2);
  expect(unionFind.isSmaeClass(0, 1)).toBe(false);
});

test("simetry", () => {
  const unionFind = new UnionFind();
  unionFind.add(0);
  expect(unionFind.isSmaeClass(0, 0)).toBe(true);
});

test("reflexivity", () => {
  const unionFind = new UnionFind();
  unionFind.add(0);
  unionFind.add(1);
  unionFind.union(0, 1);
  expect(unionFind.isSmaeClass(0, 1)).toBe(true);
  expect(unionFind.isSmaeClass(1, 0)).toBe(true);
});

test("transitivity", () => {
  const unionFind = new UnionFind();
  unionFind.add(0);
  unionFind.add(1);
  unionFind.add(2);
  unionFind.union(0, 1);
  unionFind.union(1, 2);
  expect(unionFind.isSmaeClass(0, 2)).toBe(true);
});


