import React from "react";
import styled, { withTheme } from "styled-components/macro";

import { CardContent, Card as MuiCard, Typography } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import { spacing } from "@material-ui/system";

import { Pie } from "react-chartjs-2";
import { indigo } from "@material-ui/core/colors";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;

function PieChart({ theme }) {
  const data = {
    labels: ["관찰형", "교육형", "규범형", "복합형", "봉사형", "분석형", "생명형"],
    datasets: [
      {
        data: [260, 125, 54, 146, 146, 146 , 146 ],
        backgroundColor: [
          theme.palette.secondary.main,
          orange[500],
          orange[50],
          indigo[300],
          red[500],
          red[350],
          red[50],
        ],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pie Chart
        </Typography>
        <Typography variant="body2" gutterBottom>
          Pie charts are excellent at showing the relational proportions between
          data.
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Pie data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(PieChart);
