<script>
import { UserService } from '../services/user.service.js'
import {User} from "../../../../public/user/model/user.entity.js";

export default {
  name: 'UserCard',
  props: {
    userId: { type: Number, default: 1 }
  },
  data() {
    return { user: User }
  },
  created() {
    new UserService().getUser(this.userId)
        .then(({ data }) => (this.user = data))
        .catch(console.error)
    console.log("UserCard created")
  }
}
</script>

<template>
<div v-if="user" class="bg-gray-100 rounded-lg p-3 flex gap-5 items-center">
    <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full" />
    <div>
      <p class="font-semibold text-sm text-gray-800">{{ user.name }}</p>
      <p class="text-xs text-gray-500">{{ user.email }}</p>
    </div>
  </div>
</template>
