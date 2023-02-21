import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Menú',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: 'dashboard-admin',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Campañas',
          url: 'listado-campanias',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Grupos de agentes',
          url: 'listado-grupos',
          roles: [{ name: 'Administrador' }],
        },
        
        {
          titulo: 'Agentes',
          url: 'agents',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Dashboard',
          url: '/dashboard',
          roles: [{ name: 'Lider' }],
        },
        {
          titulo: 'Mi Campaña',
          url: 'list-campanias-supervisor',
          roles: [{ name: 'Lider' }],
        },
      ],
    },
    
  ];
  constructor() {}
}
