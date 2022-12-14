import axios from "axios";
import { Group, Member } from "@/types/Member";
import $store from "@/store/index";
import memberList from "@/components/surfaces/MemberList.vue";

const baseURL = process.env.VUE_APP_SERVICE_API_URL;
export default class ApiService {
  axios;

  constructor() {
    this.axios = axios.create({
      baseURL,
    });
  }

  private fetchMember(raw: any): Member {
    const { id, name, gender, group, belong, profileColor, groupLeader } = raw;
    return {
      id,
      name,
      gender,
      group,
      belong,
      color: profileColor,
      isRep: groupLeader,
    } as Member;
  }

  async getGroupById(id: number): Promise<Member[]> {
    const res = await this.axios.get(`/api/participant/group/${id}`);
    const members = res.data[id]?.members;
    if (members && members.length) {
      return members.map((member: any) => this.fetchMember(member));
    }
    return [];
  }

  async fetchGroup(
    query:
      | {
          page?: number;
          group?: string[];
          name?: string;
        }
      | undefined = undefined
  ): Promise<Group[]> {
    const res: { [key: string]: any } = await this.axios.get(
      `/api/participant`,
      { params: query }
    );
    const groups = res.data.groups;
    await $store.dispatch("updateLeaderPeriod", !!res.data.leader_period);
    if (groups) {
      return Object.keys(groups).map((gid) => {
        const gRaw = groups[gid];
        return {
          id: Number(gid),
          members: gRaw.members.map((member: any) => this.fetchMember(member)),
        } as Group;
      });
    }
    return [];
  }

  async searchMember(
    name: string,
    page = 1
  ): Promise<{ page: number; members: Member[] }> {
    const res: { [key: string]: any } = await this.axios.get(
      `/api/participant/member`,
      { params: { name, page } }
    );
    if (res.data) {
      return {
        page: res.data.page,
        members: res.data.list.map((member: any) => this.fetchMember(member)),
      };
    }
    throw new Error("search api err");
  }

  async updateGroupLeader(member: Member) {
    await this.axios.put(`/api/participant/${member.id}/leader`, {
      leader: 1,
    });
  }
}
