# DOCIQ Project Documentation

## 1. Database Design

The DOCIQ project employs a relational database design implemented using PostgreSQL and the Sequelize ORM for Node.js. The database architecture follows a modular approach, separating concerns into distinct entities while maintaining relationships between them.

### 1.1 Entity Relationship Overview

The core entities in the system include:

- **Users**: Individuals who interact with the system, with different roles (user/admin)
- **Forms**: Templates created by administrators that define data collection structures
- **Submissions**: Completed forms submitted by users
- **Documents**: Files attached to submissions with metadata
- **Divisions**: Organizational units to which users belong
- **Categories**: Classification system for forms

### 1.2 Database Schema

The database consists of the following tables with their relationships:

- **Users ←→ Forms**: Many-to-many relationship through UsersToForms junction table
- **Users → Submissions**: One-to-many relationship (a user can make multiple submissions)
- **Forms → Submissions**: One-to-many relationship (a form can have multiple submissions)
- **Submissions → Documents**: One-to-many relationship (a submission can have multiple documents)

## 2. Data Structure

### 2.1 User Model
```javascript
User {
  user_id: UUID (PK)
  user_name: STRING
  email: STRING (unique)
  password: STRING
  designation: STRING
  role: ENUM("user", "admin")
  division: STRING
}
```

Purpose: Stores user account information, authentication credentials, and organizational metadata.

### 2.2 Form Model
```javascript
Form {
  form_id: UUID (PK)
  form_name: STRING (unique)
  category: STRING
  submission_type: ENUM('one-time', 'multiple')
  form_data: ARRAY(JSON)
  recipients: ARRAY(UUID)
}
```

Purpose: Defines form templates with structured data fields, categories, and designated recipients.

### 2.3 Submissions Model
```javascript
Submissions {
  submission_id: UUID (PK)
  form_id: UUID (FK → Form)
  user_id: UUID (FK → User)
  submission_data: ARRAY(JSON)
  status: ENUM('pending', 'resubmit', 'approved')
  file_paths: ARRAY(STRING)
  reason: STRING
}
```

Purpose: Captures completed form data submitted by users, tracks approval status and attached files.

### 2.4 Documents Model
```javascript
Documents {
  document_id: UUID (PK)
  form_name: STRING
  user_name: STRING
  submission_id: UUID
  file_name: STRING
  division_name: STRING
  category: STRING
  meta_data: JSON
  file_path: STRING
  date: DATE
}
```

Purpose: Stores metadata and references to files uploaded as part of form submissions.

### 2.5 Divisions Model
```javascript
Divisions {
  division_id: UUID (PK)
  division_name: STRING (unique)
}
```

Purpose: Maintains organizational divisions for categorizing users and documents.

### 2.6 Categories Model
```javascript
Categories {
  category_id: UUID (PK)
  category_name: STRING (unique)
}
```

Purpose: Provides a classification system for forms and documents.

### 2.7 UsersToForms Model (Junction Table)
```javascript
UsersToForms {
  user_id: UUID (FK → User)
  form_id: UUID (FK → Form)
  form_status: ENUM('open', 'close')
}
```

Purpose: Manages the many-to-many relationship between users and forms, tracking which forms are available to which users.

## 3. Normalization

The DOCIQ database follows standard normalization principles to minimize redundancy and maintain data integrity:

### 3.1 First Normal Form (1NF)
- All tables have a primary key (UUID)
- No repeating groups within rows
- Each column contains atomic values

### 3.2 Second Normal Form (2NF)
- All tables meet 1NF requirements
- All non-key attributes are fully dependent on the primary key
- No partial dependencies

### 3.3 Third Normal Form (3NF)
- All tables meet 2NF requirements
- No transitive dependencies
- Foreign keys are used to reference related entities instead of duplicating data

### 3.4 Specific Normalization Examples

1. **User and Form Separation**: User information is stored separately from form data, with relationships established through foreign keys.

2. **Junction Table for Many-to-Many**: The UsersToForms table properly normalizes the many-to-many relationship between users and forms.

3. **Category and Division Normalization**: Categories and divisions are maintained in separate tables with unique identifiers, allowing for referential integrity when referenced from other tables.

4. **Document Metadata**: While the Documents table contains several descriptive fields, these serve as searchable metadata rather than redundant data, supporting efficient querying.

## 4. Implementation

### 4.1 Technology Stack

The DOCIQ project is implemented using:
- **Backend**: Node.js with Express.js
- **ORM**: Sequelize for database interaction
- **Database**: PostgreSQL
- **Authentication**: JWT (assumed based on user model)

### 4.2 Sequelize Model Implementation

The models are implemented using Sequelize's define method, which creates JavaScript objects that map to database tables:

```javascript
const Model = sequelize.define('model_name', {
  // attributes
}, {
  // options
});
```

### 4.3 Associations

Relationships between models are established using Sequelize's association methods:

```javascript
// One-to-Many relationships
Form.hasMany(Submissions, { foreignKey: 'form_id', onDelete: 'CASCADE' });
User.hasMany(Submissions, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Belongs-To relationships
Submissions.belongsTo(Form, { foreignKey: 'form_id' });
Submissions.belongsTo(User, { foreignKey: 'user_id' });

// Many-to-Many relationships
User.belongsToMany(Forms, {
  through: UsersToForms,
  foreignKey: 'user_id',
  otherKey: 'form_id',
});

Forms.belongsToMany(User, {
  through: UsersToForms,
  foreignKey: 'form_id',
  otherKey: 'user_id',
  onDelete: 'CASCADE',
});
```

### 4.4 Data Validation and Constraints

Sequelize provides validation at the model level:

- **NOT NULL constraints**: `allowNull: false`
- **Unique constraints**: `unique: true`
- **Default values**: `defaultValue: value`
- **Custom validations**: Using the `validate` property

### 4.5 Transaction Management

For operations that require multiple database changes, Sequelize's transaction support should be used to ensure data integrity.

## 5. Planning & Scheduling

### 5.1 Form Management Lifecycle

1. **Form Creation**: Administrators create form templates with structured fields
2. **Form Assignment**: Forms are assigned to specific users or divisions
3. **Form Submission**: Users fill and submit forms with required data
4. **Submission Review**: Relevant personnel review and approve/reject submissions
5. **Document Storage**: Attached documents are stored with metadata for retrieval

### 5.2 Scheduling Recommendations

1. **Automated Reminders**: Implement scheduled tasks to remind users of pending form submissions
2. **Periodic Cleanup**: Schedule database maintenance to archive old submissions
3. **Backup Strategy**: Regular database backups on a defined schedule
4. **Report Generation**: Scheduled generation of summary reports for administrative review

### 5.3 Task Prioritization

For implementing the DOCIQ system, the following task order is recommended:

1. User authentication and authorization system
2. Basic form definition and storage
3. Form submission functionality
4. Document attachment and storage
5. Approval workflow implementation
6. Reporting and analytics features
7. Integration with external systems (if applicable)

## 6. Testing

### 6.1 Unit Testing

For individual components:

- **Model Testing**: Validate model constraints, defaults, and validations
- **Controller Testing**: Test API endpoints with mock requests and responses
- **Service Testing**: Ensure business logic functions correctly with various inputs

### 6.2 Integration Testing

For testing interactions between components:

- **API Endpoint Testing**: Test complete request/response cycles
- **Database Integration**: Verify correct data storage and retrieval
- **Authentication Flow**: Test user login, registration, and permissions

### 6.3 End-to-End Testing

For testing complete user workflows:

- **Form Creation to Submission**: Test the complete lifecycle of a form
- **Document Upload and Retrieval**: Test the document management features
- **User Role-Based Access**: Verify different user roles have appropriate access

### 6.4 Testing Tools Recommendation

- **Jest/Mocha**: For unit and integration tests
- **Supertest**: For API testing
- **Cypress**: For end-to-end testing

## 7. Future Enhancements and Conclusion

### 7.1 Potential Enhancements

1. **Advanced Form Features**:
   - Conditional fields based on previous answers
   - Dynamic form sections
   - Multi-language support

2. **Workflow Improvements**:
   - Multi-level approval workflows
   - Delegation of approval authority
   - Comment threads on submissions

3. **Document Management**:
   - Version control for documents
   - Document comparison tools
   - OCR for uploaded documents

4. **Analytics & Reporting**:
   - Dashboard with submission statistics
   - Custom report builder
   - Export capabilities to various formats

5. **Integration Possibilities**:
   - Integration with document management systems
   - Calendar integration for deadlines
   - Notification systems (email, SMS, etc.)

6. **Mobile Support**:
   - Responsive design optimization
   - Native mobile app for submissions
   - Offline form completion capability

### 7.2 Technical Debt Considerations

Areas to address in future iterations:

- Password hashing implementation is not detailed in current models
- Consider moving to TypeScript for better type safety
- Implement more robust validation for form_data and submission_data JSON structures
- Add comprehensive logging for audit trails

### 7.3 Conclusion

The DOCIQ project provides a robust foundation for managing organizational forms, submissions, and documents. The database design follows good normalization practices and the implementation leverages modern ORM capabilities. By following the recommended planning, testing strategies, and considering future enhancements, the system can scale effectively to meet evolving organizational needs.

The modular approach to the data model allows for flexibility in extending the system's capabilities while maintaining data integrity and performance.

