<template>
  <CHeader>
    <CHeaderBrand class="ml-3" to="/admin/dashboard">
      <h5>SmartCinema - Admin dashboard</h5>
    </CHeaderBrand>
    <CHeaderNav class="ml-auto mr-4">
      <CDropdown inNav class="c-header-nav-items mx-2" placement="bottom-end" add-menu-classes="pt-0" :offset="[0, 10]">
        <template #toggler>
          <CHeaderNavLink> <font-awesome-icon icon="user" class="mr-3" /> Admin </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center mb-2" color="light">
          <strong>Profilo</strong>
        </CDropdownHeader>
        <CDropdownItem @click="logOut">
          <font-awesome-icon icon="sign-out-alt" class="mr-3" />
          <span class="mr-2">Logout</span>
        </CDropdownItem>
      </CDropdown>
    </CHeaderNav>
  </CHeader>
</template>

<script lang="ts" src="./Header.ts" />
