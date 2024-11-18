# Case Status Workflow and Roles and Permissions

## Case Status Workflow

1. **Open** - A case can be created by the scribe intern.

2. **Draft** - If the case is not completed, it remains editable by the scribe intern.

3. **Ready for Doctor** - The doctor can review and accept the case. If accepted, the status changes to **InProgress**, where only the assigned doctor can view and edit it. During this stage, the doctor may also return the case to the patient or scribe intern if additional information is required. Only the doctor and scribe intern can view the case in this state.

4. **Completed** - The case is marked as "Completed" in one of the following ways:
   - The scribe intern gives it to the patient via a phone call and marks it as completed from their dashboard.
   - The patient reads the case online, which automatically changes the status to "Completed."
   - The patient visits the doctor’s office in person, and the doctor marks it as completed.

---

## Roles and Permissions

- **Scribe**:
  - Can write and edit a case in any status up until it reaches **Ready for Doctor** (status 2).
  - Has permission to edit cases in **Ready for Doctor** (status 2).

- **Doctor**:
  - Can view cases in **Ready for Doctor** (status 2).
  - Has permission to change the case from **Ready for Doctor** (status 2) to **Doctor Acceptance** (status 3).
  - Can view and tally the case as needed in this status.

- **Doctor Editing**:
  - The doctor can edit cases in **Doctor Acceptance** (status 4).

- **Scribe Viewing**:
  - The scribe can view the status of a case and check it once the doctor has completed editing in **Doctor Acceptance** (status 4).
  - When the case transitions to **Completed** (status 5), the scribe can confirm it if the patient marks it as completed through one of the following actions:
    - The patient reads the case online via their dashboard.
    - The scribe contacts the patient and marks it as completed on their behalf.
    - The patient visits the doctor’s office in person, and the doctor or scribe confirms it as completed.
