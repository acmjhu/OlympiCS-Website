export default interface Team {
  id: number;
  name: string;
  scores: Record<string, number>;
  score: number;
}
