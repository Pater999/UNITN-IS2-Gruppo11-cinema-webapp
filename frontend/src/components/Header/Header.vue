<template>
  <CHeader>
    <CHeaderBrand class="ml-3" to="/">
      <h5>SmartCinema</h5>
    </CHeaderBrand>
    <CHeaderBrand class="ml-3" to="/comunications">
      <h5>Annunci</h5>
    </CHeaderBrand>
    <CHeaderNav class="ml-auto mr-4">
      <CDropdown inNav class="c-header-nav-items mx-2" placement="bottom-end" add-menu-classes="pt-0" :offset="[0, 10]">
        <template #toggler>
          <CHeaderNavLink> <font-awesome-icon icon="user" class="mr-3" /> {{ isAuthenticated ? username : "ACCEDI" }} </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center mb-2" color="light">
          <strong>Profilo</strong>
        </CDropdownHeader>
        <CDropdownItem v-if="isAuthenticated && role == 'admin'" @click="goToAdminDashboard">
          <font-awesome-icon icon="user-cog" class="mr-3" />
          <span class="mr-2">Admin dashboard</span>
        </CDropdownItem>
        <CDropdownItem v-if="isAuthenticated" @click="account">
          <font-awesome-icon icon="address-card" class="mr-3" />
          <span class="mr-2">Account</span>
        </CDropdownItem>
        <CDropdownItem v-if="isAuthenticated" @click="logOut">
          <font-awesome-icon icon="sign-out-alt" class="mr-3" />
          <span class="mr-2">Logout</span>
        </CDropdownItem>
        <CDropdownItem v-else @click="logIn">
          <font-awesome-icon icon="sign-in-alt" class="mr-3" />
          <span class="mr-2">Login</span>
        </CDropdownItem>
      </CDropdown>
    </CHeaderNav>
  </CHeader>
</template>

<script lang="ts" src="./Header.ts" />
