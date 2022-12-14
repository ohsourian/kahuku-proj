export interface Member {
  id: number;
  name: string;
  gender: number; //0: ํ์ , 1: ์๋งค
  group: number;
  belong: string;
  color: string;
  isRep: boolean;
}

export interface Group {
  id: number;
  members: Member[];
}
