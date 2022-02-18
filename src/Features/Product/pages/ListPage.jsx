import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Container, Grid, Pagination, Paper, Typography } from "@mui/material";
import productApi from "api/productApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FilterViewer from "../components/FilterViewer";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";

ListPage.propTypes = {};

//TODO: khi on change thì Filter thay đổi, khi filter thay đổi chạy useEffect setPage

function ListPage(props) {
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    // true -> "true"
    // {isPromotion : "true"}
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  // const [filters,setFilters] = useState(() => ({
  //     ...queryParams,
  //     _page: Number.parseInt(queryParams._page) || 1,
  //     _limit: Number.parseInt(queryParams._limit) || 9,
  //     _sort: queryParams._sort || 'salePrice:ASC'
  // }));

  // useEffect(() => {
  //     //Todo: sync filters to URL
  //     history.push({
  //         pathname: history.location.pathname,
  //         search: queryString.stringify(filters),
  //     })
  // },[history,filters])

  useEffect(() => {
    //Có thể viết là const fetchProducts = async () => {}  fetchProducts
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination); //pagination của destructuring ở trên
      } catch (error) {
        console.log("Failed to fetch API", error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    //prevFilters là filters ở trên
    //page là ở dưới khi onChange
    // setFilters((prevFilters) => ({
    //     ...prevFilters,
    //     _page: page,
    // }));

    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    //prevFilters là filters ở trên
    // setFilters((prevFilters) => ({
    //     ...prevFilters,
    //     _sort: newSortValue,
    // }));

    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    //prevFilters là filters ở trên
    // setFilters((prevFilters) => ({
    //     ...prevFilters,
    //     ...newFilters,
    // }));

    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item sx={{ width: "250px" }}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              ></ProductFilters>
            </Paper>
          </Grid>

          <Grid item sx={{ flex: "1 1 0" }}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer
                filters={queryParams}
                onChange={setNewFilters}
              ></FilterViewer>

              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList} />
              )}
              {/*props {data} bên Products list bằng productList bên đây  */}
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "center",
                  marginTop: "20px",
                  paddingTop: "10px",
                }}
              >
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
