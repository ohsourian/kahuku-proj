export interface Member {
  id: number;
  name: string;
  gender: number; //0: 형제, 1: 자매
  group: number;
  belong: string;
  color: string;
  isRep: boolean;
}

export interface Group {
  id: number;
  members: Member[];
}
