import { TableService } from './table.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataBase: MatTableDataSource<any> = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name'];

  constructor(private tableService: TableService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.tableService.getTableData().subscribe(data => {
      this.dataBase = new MatTableDataSource(data.data);
      this.dataBase.sort = this.sort;
      this.dataBase.paginator = this.paginator;
    })
  }

  doFilter(inputValue: any) {
    this.dataBase.filter = inputValue.target.value;
    if (!inputValue.target.value) {
      this.dataBase.filter = ''
    }
  }
}
