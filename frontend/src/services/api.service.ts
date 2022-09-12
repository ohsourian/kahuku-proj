import axios from "axios";
import { Member } from "@/types/Member";

const baseURL = process.env.VUE_APP_SERVICE_API_URL;
export default class ApiService {
  axios;

  constructor() {
    console.log({ baseURL });
    this.axios = axios.create({
      baseURL,
    });
  }

  async getGroupById(id: number): Promise<Member[]> {
    const res = await this.axios.get(`/api/participant/group/${id}`);
    const members = res.data[id]?.members;
    if (members && members.length) {
      return members.map((member: any) => {
        const { id, name, gender, group, belong, profileColor, groupLeader } =
          member;
        return {
          id,
          name,
          gender,
          group,
          belong,
          color: profileColor,
          isRep: groupLeader,
        } as Member;
      });
    }
    return [];
  }
}
