import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncidenciaService } from '../../services/incidencia.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-inicio-dash',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-4">
      <h3 class="mb-4">📊 Resumen del Sistema</h3>

      <div class="row g-3">
        <div class="col-lg-4 col-md-6">
          <div class="card border-primary shadow-sm">
            <div class="card-body text-center">
              <h1 class="text-primary">{{ totalIncidencias }}</h1>
              <p class="text-muted">Incidencias</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="card border-warning shadow-sm">
            <div class="card-body text-center">
              <h1 class="text-warning">{{ pendientes }}</h1>
              <p class="text-muted">Pendientes</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="card border-success shadow-sm">
            <div class="card-body text-center">
              <h1 class="text-success">{{ solucionadas }}</h1>
              <p class="text-muted">Solucionadas</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <div class="card shadow-sm">
            <div class="card-header"><h5 class="mb-0">⚡ Acceso Rapido</h5></div>
            <div class="card-body">
              @if (esJefeOTecnico) {
                <a routerLink="/dashboard/GestionIncidencias" class="btn btn-outline-primary m-1">🛠️ Incidencias</a>
              }
              @if (esJefeOSistemas) {
                <a routerLink="/dashboard/GestionRepuestos" class="btn btn-outline-warning m-1">🔩 Repuestos</a>
              }
              @if (esJefe) {
                <a routerLink="/dashboard/MantenimientoUsuarios" class="btn btn-outline-info m-1">👥 Mantenimiento</a>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InicioDash implements OnInit {
  private incidenciaService = inject(IncidenciaService);
  private session = inject(SessionService);

  totalIncidencias = 0;
  pendientes = 0;
  solucionadas = 0;
  rolCodigo = '';

  ngOnInit(): void {
    this.rolCodigo = this.session.getInfoSession()?.rol?.codigo ?? '';

    this.incidenciaService.getAll().subscribe({
      next: (data: any) => {
        this.totalIncidencias = data?.length || 0;
        this.pendientes = data?.filter((i: any) => i.estado === 'Pendiente').length || 0;
        this.solucionadas = data?.filter((i: any) => i.estado === 'Solucionado').length || 0;
      },
    });
  }

  get esJefe(): boolean { return this.rolCodigo === 'JEFE'; }
  get esJefeOTecnico(): boolean { return this.rolCodigo === 'JEFE' || this.rolCodigo === 'TECNICO'; }
  get esJefeOSistemas(): boolean { return this.rolCodigo === 'JEFE' || this.rolCodigo === 'SISTEMAS'; }
}
