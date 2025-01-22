import "./UserHome.css";
const UserHome = () => {
  return (
    <>
      <div className="row1">
        <div className="card1">
          <div className="dept-details">Department of Computer Science</div>
        </div>
        <div className="card2">
          <div className="files-submitted">
            <table className="file-table">
              <tr>
                <th>Pending</th>
                <th>Date</th>
                <th>Submission Date</th>
              </tr>
              <tr>
                <td>Extra Curriculars</td>
                <td>20/01/2025</td>
                <td>24/01/2025</td>
              </tr>
              <tr>
                <td>Lab Report</td>
                <td>20/01/2025</td>
                <td>24/01/2025</td>
              </tr>
              <tr>
                <td>Student Achievements</td>
                <td>20/01/2025</td>
                <td>24/01/2025</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="row2">
        <div className="card3">
          <div className="files-submitted">
            <table className="file-table">
              <tr>
                <th>File Name</th>
                <th>Date</th>
                <th>Signed By</th>
              </tr>
              <tr>
                <td>Staff Info</td>
                <td>20/01/2025</td>
                <td>HOD</td>
              </tr>
              <tr>
                <td>Student Performance</td>
                <td>15/01/2025</td>
                <td>Document Head</td>
              </tr>
              <tr>
                <td>Exam Report</td>
                <td>12/01/2025</td>
                <td>HOD</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
