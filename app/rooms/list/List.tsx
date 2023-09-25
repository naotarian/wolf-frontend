'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, TableHead } from '@mui/material'

export default function EnhancedTable(props: { list: Array<{ id: string }> }) {
  const { list } = props
  console.log(list)
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0

  const visibleRows = React.useMemo(
    () => list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage],
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Paper className="p-2 rounded-none">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="font-bold">
                  ルームマスター
                </TableCell>
                <TableCell align="center" className="font-bold">
                  募集人数
                </TableCell>
                <TableCell align="center" className="font-bold">
                  ルール
                </TableCell>
                <TableCell align="center" className="font-bold">
                  部屋タイプ
                </TableCell>
                <TableCell align="center" className="font-bold">
                  アクション
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map(row => {
                return (
                  <TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
                    <TableCell align="center">test</TableCell>
                    <TableCell align="center">10人</TableCell>
                    <TableCell align="center">超人気</TableCell>
                    <TableCell align="center">初心者OK</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        className="rounded-none"
                        href={`/room/${row.id}`}>
                        入室
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
