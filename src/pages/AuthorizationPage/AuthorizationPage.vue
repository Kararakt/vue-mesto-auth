<script setup lang="ts">
import './AuthorizationPage.scss';

import router from '../../router/router';

import { UserData } from '../../models/models';
import { authorize, register } from '../../utils/auth';

import Login from '../../components/Login/Login.vue';
import Register from '../../components/Register/Register.vue';
import MyButton from '../../components/UI/MyButton/MyButton.vue';
import InfoTooltip from '../../components/InfoTooltip/InfoTooltip.vue';

const store = useStore();

const currentTab = ref<string>('Вход');
const currentComponent = shallowRef<Component>(Login);

const isPopupOpen = ref<boolean>(false);
const message = ref<boolean | null>(null);

const closePopup = () => {
  isPopupOpen.value = false;
};

const tabs = [
  {
    id: 1,
    title: 'Вход',
    component: Login,
  },
  {
    id: 2,
    title: 'Регистрация',
    component: Register,
  },
];

const changeTab = (tab: string, component: Component) => {
  currentTab.value = tab;
  currentComponent.value = component;
};

const handleAuth = (
  authMethod: (userData: UserData) => Promise<Response>,
  userData: UserData
) => {
  authMethod(userData)
    .then((res: any) => {
      if (!res || res.status === 400) throw new Error('Что-то пошло не так');

      if (currentTab.value === 'Регистрация') {
        isPopupOpen.value = true;
        message.value = true;
        changeTab('Вход', Login);
      } else {
        router.push('/');
        store.dispatch('user/login');
        localStorage.setItem('jwt', res.token);
      }
    })
    .catch((err: Error) => {
      console.error('Ошибка авторизации', err);
      isPopupOpen.value = true;
      message.value = false;
    });
};

const handleLogin = (data: UserData) => handleAuth(authorize, data);
const handleRegister = (data: UserData) => handleAuth(register, data);

const handlePropsCheck = computed(() => {
  return currentTab.value === 'Вход'
    ? { onLogin: handleLogin }
    : { onRegister: handleRegister };
});
</script>

<template>
  <section class="authorization">
    <ul class="authorization__tabs">
      <li v-for="tab in tabs" :key="tab.id">
        <MyButton
          type="button"
          :textButton="tab.title"
          @click="changeTab(tab.title, tab.component)"
          :class="[
            'authorization__button',
            { authorization__button_active: currentTab === tab.title },
          ]"
        />
      </li>
    </ul>
    <component :is="currentComponent" v-bind="handlePropsCheck" />
  </section>

  <InfoTooltip v-model="isPopupOpen" :message="message" :onClose="closePopup" />
</template>
