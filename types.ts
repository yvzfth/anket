interface IVote {
  [key: string]: string;

  option: string;
  city: string;
}
interface IResult {
  id: string;
  [VoteOption.Option1]: number;
  [VoteOption.Option2]: number;
  [VoteOption.Option3]: number;
  [VoteOption.Option4]: number;
}
export enum VoteOption {
  Option1 = 'Recep Tayyip Erdoğan',
  Option2 = 'Kemal Kılıçdaroğlu',
  Option3 = 'Muharrem İnce',
  Option4 = 'Sinan Oğan',
}
export type { IVote, IResult };
