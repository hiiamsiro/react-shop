import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { makeStyles } from "@mui/styles";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  onChangeRHF: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityField(props) {
  const { form, name, label, disabled, onChangeRHF } = props; //form là props của const form = useForm bên TodoForm
  const {
    control,
    setValue,
    formState: { errors, touchedFields },
  } = form; //lấy ra object form trong props form trên
  const hasError = !!errors[name];

  const useStyles = makeStyles({
    root: {},
    box: {
      display: "flex",
      flexFlow: "row nowrap",
      alignItems: "center",
      maxWidth: "2000px",
    },
  });
  const classes = useStyles();
  const handleChange = (value) => {
    onChangeRHF(value);
  };
  return (
    <div>
      {/* <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, name, value}}) => (
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    
                    error={!!hasError}
                    helperText={errors[name]?.message}
                    
                    value={value}
                    label={label} //cho thuộc tính label bằng props label bên thằng cha(TodoForm)
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    disabled={disabled}
                />
            )}
        ></Controller> */}

      <FormControl
        fullWidth
        error={hasError}
        margin="normal"
        variant="outlined"
        size="small"
      >
        <Typography>{label}</Typography>

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, name, value } }) => (
            <Box className={classes.box}>
              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
                  )
                }
              >
                <RemoveCircleOutline />
              </IconButton>

              <OutlinedInput
                id={name}
                type="quantity"
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                onBlur={() => handleChange(value)}
              />

              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                  )
                }
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
          )}
        />

        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuantityField;
