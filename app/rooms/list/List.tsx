'use client'

import * as React from 'react'

import { Button, TableHead, Typography } from '@mui/material'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

export default function EnhancedTable(props: {
  list: Array<{
    id: string
    master_user_id: string
    room_master: {
      id: string
      name: string
      character_id: number
    }
  }>
}) {
  const { list } = props
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
              {visibleRows.map(row => (
                <TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
                  <TableCell align="center">
                    <div className="flex gap-4 my-0 mx-auto w-fit	items-center">
                      <Avatar
                        alt="Remy Sharp"
                        className="border"
                        sx={{ width: 48, height: 48 }}
                        src={`/images/characters/No${row.room_master.character_id}.jpg`}
                      />
                      <Typography variant="body1">
                        {row.room_master.name}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">10人</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">超人気</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">初心者OK</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      className="rounded-none"
                      href={`/room/${row.id}`}>
                      入室
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
