import { useQuery } from "@apollo/client";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useState } from "react";
import { GET_ALL_READ_LISTS } from "../gql/query";
import { GetAllReadLists } from "../types/generated-types";
import { getSelected, Order, ReadListKey } from "../utils/table";
import ReadListTableBody from "./TableBody";
import ReadListTableHead from "./TableHead";
import ReadListTableToolbar from "./TableToolbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    }
  })
);

export default function ReadListTable() {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<ReadListKey>("submittedAt");
  const [selected, setSelected] = useState<string[]>([]);

  const { data, loading, refetch } = useQuery<GetAllReadLists>(
    GET_ALL_READ_LISTS,
    { fetchPolicy: "network-only" }
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data === undefined) {
    return <div>No Data!</div>;
  }

  const { allReadLists } = data;

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: ReadListKey
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = allReadLists?.map(n => n.id) ?? [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
    const newSelected = getSelected(selected, id);
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ReadListTableToolbar selected={selected} refetch={() => refetch()} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <ReadListTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allReadLists?.length ?? 0}
            />
            <ReadListTableBody
              rows={allReadLists}
              order={order}
              orderBy={orderBy}
              loading={false}
              onRowClick={handleClick}
              isSelected={isSelected}
            />
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
