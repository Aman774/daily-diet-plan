const schedule = require("node-schedule");

const xl = require("excel4node");

const diet = require("./data-source/diet.data");
const { emailService } = require("./other-services/nodemailer");

const schedule_list = [];
async function EmailScheduler() {
  const diet_list = await diet.getSchedules();

  __print("diet_list*******", diet_list);

  for (let i in diet_list) {
    // const date = new Date(diet_list[i].diet_time);

    schedule_list.push({
      email: diet_list[i].email,
      date: diet_list[i].diet_time,
      user_id: diet_list[i].user_id,
    });
  }

  __print("schedule list*******", schedule_list);

  for (let i in schedule_list) {
    const job = schedule.scheduleJob(schedule_list[i].date, async function () {
      console.log("diet email send to ", schedule_list[i].email);

      const emailScheduleData = await diet.getDataForEmailSchedule(
        schedule_list[i].user_id,
        schedule_list[i].date.toISOString()
      );

      __print("emailScheduleData****", emailScheduleData);

      __print("email *********", emailScheduleData[0][0].email);

      const wb = new xl.Workbook();
      const ws = wb.addWorksheet("Diet Plan");
      const headingColumnNames = [
        "item_name",
        "diet_time",
        "status",
        "diet_type",
        "email",
      ];

      let headingColumnIndex = 1;
      headingColumnNames.forEach((heading) => {
        ws.cell(1, headingColumnIndex++).string(heading);
      });

      //Write Data in Excel file
      let rowIndex = 2;
      emailScheduleData[0].forEach((record) => {
        let columnIndex = 1;
        Object.keys(record).forEach((columnName) => {
          console.log("colname------>", record[columnName], columnName);

          record[columnName] === null
            ? (record[columnName] = "")
            : record[columnName];

          //   if (columnName == "status" && record[columnName] == "false") {
          //     record[columnName] = "not-completed";
          //   } else {
          //     record[columnName] = "completed";
          //   }

          ws.cell(rowIndex, columnIndex++).string(record[columnName]);
        });
        rowIndex++;
      });

      const excel = wb.write("./diet-plan-excel/diet_plan.xlsx");
      __print("excel********************", excel);

      const data = {
        from: "noreply@gmail.com",
        to: emailScheduleData[0][0].email,
        subject: "Diet plan",
        text: `Diet plan`,
        html: `please find attach your diet plan in the excel`,
        attachments: [
          {
            filename: "diet_plan.xlsx",
            path: "./diet-plan-excel/diet_plan.xlsx",
          },
        ],
      };
      await emailService.sendMail(data, (err, info) => {
        if (err) {
          __print("email error", err);
          return;
        }
        __print("email info --", info);
      });
    });
  }
}

// const date1 = new Date(2022, 03, 10, 7, 01, 0);

// const date2 = new Date(2022, 03, 10, 7, 02, 0);

// const list = [date1, date2];

// console.log(list);

// for (let i in list) {
//   const job = schedule.scheduleJob(list[i], function () {
//     console.log("The world is going to end today.");
//   });
// }

EmailScheduler();
