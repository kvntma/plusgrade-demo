export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export type TaxDetail = {
  bracket: TaxBracket;
  taxPaid: number;
};

export type TaxData = {
  tax_brackets: TaxBracket[];
};
