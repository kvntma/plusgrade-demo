import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { formatNumberToDollars } from "../../utils/formats";
import { TaxDetail } from "../../types/types";

type TaxBreakdownTableProps = {
  taxDetails: TaxDetail[];
};

const TaxBreakdownTable: React.FC<TaxBreakdownTableProps> = ({
  taxDetails,
}) => {
  const totalTaxPaid = taxDetails.reduce(
    (acc, { taxPaid }) => acc + taxPaid,
    0
  );

  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "USD",
    style: "currency",
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 600, margin: "auto", mt: 3, boxShadow: 3 }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mt: 2, mb: 1 }}>
        Marginal Tax Breakdown
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell align="center">
              <strong>Income Range</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Tax Rate</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Tax Paid</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taxDetails.map((detail, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {`${formatNumberToDollars(detail.bracket.min, "en-US", {})} - ${
                  detail.bracket.max
                    ? `${formatNumberToDollars(
                        detail.bracket.max,
                        "en-US",
                        {}
                      )}`
                    : "and over"
                }`}
              </TableCell>
              <TableCell align="center">
                {(detail.bracket.rate * 100).toFixed(1)}%
              </TableCell>
              <TableCell align="center">
                {formatNumberToDollars(detail.taxPaid, "en-US", {
                  ...formatOptions,
                })}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ backgroundColor: "#e0e0e0", fontWeight: "bold" }}>
            <TableCell align="center">
              <strong>Total</strong>
            </TableCell>
            <TableCell align="center">-</TableCell>
            <TableCell align="center">
              <strong>
                {formatNumberToDollars(totalTaxPaid, "en-US", {
                  ...formatOptions,
                })}
              </strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxBreakdownTable;
