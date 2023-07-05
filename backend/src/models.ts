export const dbo = {
	WorkSession: "dbo.[WorkSession]",
	Work: "dbo.[Work]",
	UserPremiumClient: "dbo.[UserPremiumClient]",
	SolutionValue: "dbo.[SolutionValue]",
	ProblemValue: "dbo.[ProblemValue]",
	Problem: "dbo.[Problem]",
	Solution: "dbo.[Solution]",
	Config: "dbo.[Config]",
	ConfigGuestUsability: "dbo.[ConfigGuestUsability]",
	ConfigPrice: "dbo.[ConfigPrice]",
	EmailQueue: "dbo.[EmailQueue]",
	EmailTemplate: "dbo.[EmailTemplate]",
	User: "dbo.[User]",
	UserOwner: "dbo.[UserOwner]",
	WorkSessionAssessment: "dbo.[WorkSessionAssessment]",
	WorkSessionStudent: "dbo.[WorkSessionStudent]",
	WorkTrainer: "dbo.[WorkTrainer]",
	WorkSessionItem: "dbo.[WorkSessionItem]",
};

export type ConfigEntity = { id: string, name: string, value: string, owner?: string, stamp?: Date, email: string }
export type ConfigGuestUsabilityEntity = { id: string, value: number, fromDate: Date, toDate: Date, email: string, owner?: string, stamp?: Date }
export type ConfigPriceEntity = { id: string, from: number, to: number, sessionPrice: number, price: number, discount: number, fromDate: Date, toDate: Date, email: string, owner?: string, stamp?: Date }
export type EmailQueueEntity = { id: string, email: string, subject: string, html: string, text: string, status: string, sendAt: Date, stamp?: Date, attach: string }
export type EmailTemplateEntity = { id: string, name: string, subject: string, html: string, text: string, stamp?: Date, owner?: string, email: string }
export type ProblemEntity = { id: string, idWorkSession: string, file: string, owner?: string, stamp?: Date, index: number, incidentFile: string, incidentType: string, incidentEmail: string, trainerIncidentEmail: string, trainerIncidentFile: string, trainerIncidentSeverity: number, trainerIncidentAction: string, active: boolean | number, email: string, opportunity: number, incidentSeverity: number, name: string, sameAs: string }
export type ProblemValueEntity = { id: string, idProblem: string, severity: number, opportunity: number, email: string, owner?: string, stamp?: Date }
export type SolutionEntity = { id: string, idProblem: string, file: string, owner?: string, stamp?: Date, index: number, incidentFile: string, incidentType: string, incidentEmail: string, trainerIncidentEmail: string, trainerIncidentFile: string, trainerIncidentSeverity: number, trainerIncidentAction: string, active: boolean | number, email: string, usability: number, incidentSeverity: number, name: string, sameAs: string }
export type SolutionValueEntity = { id: string, idSolution: string, usability: number, severity: number, email: string, owner?: string, stamp?: Date }
export type UserEntity = { id: string, rol: string, name: string, email: string, password: string, emailConfirmed: boolean | number, emailConfirmToken: string, emailSecurityCode: string, smsSecurityCode: string, resetPasswordToken: string, lastLoginStamp: Date, lastLoginError: Date, countLoginError: number, disabled: boolean | number, lockedTimeout: Date, organization: string, person: string, vat: string, address: string, iban: string, bank: string }
export type UserOwnerEntity = { id: string, name: string, email: string, active: boolean | number, stamp?: Date, owner?: string }
export type UserPremiumClientEntity = { id: string, code: string, name: string, maxNumOfSessions: number, discount: number, validFrom: Date, validTo: Date, email: string, owner?: string, stamp?: Date }
export type WorkEntity = { id: string, name: string, sessions: number, email: string, discount: number, regularPrice: number, unitPrice: number, totalPrice: number, paymentAt: Date, paymentSessionId: string, paymentIntentId: string, invoiceNumber: number, invoiceFile: string, invoiceDate: Date, description: string, sessionsUnused: number, type: string, owner?: string, index: number, code: string, stamp?: Date, note: string }
export type WorkSessionEntity = { id: string, idWork: string, email: string, name: string, description: string, code: string, type: string, fileSupport: string, fileTopic: string, state: string, stage1Begin: Date, stage1Duration: number, stage1End: Date, stage2Begin: Date, stage2Duration: number, stage2End: Date, stage2xBegin: Date, stage2xDuration: number, stage2xEnd: Date, stage3Begin: Date, stage3Duration: number, stage3End: Date, stage4Begin: Date, stage4Duration: number, stage4End: Date, stage4xBegin: Date, stage4xDuration: number, stage4xEnd: Date, stage5Begin: Date, stage5Duration: number, stage5End: Date, owner?: string, stamp?: Date, reported: boolean | number, index: number }
export type WorkSessionAssessmentEntity = { id: string, idWorkSession: string, name: string, dv: number, kt: number, cp: number, crp: number, cs: number, crs: number, wp: number, wrp: number, ws: number, wrs: number, owner?: string, stamp?: Date, email: string }
export type WorkSessionItemEntity = { idWorkSession: string, pId: string, sId: string, pIndex: number, sIndex: number, pName: string, sName: string, pActive: boolean | number, sActive: boolean | number, pEmail: string, sEmail: string, pFile: string, sFile: string, pIncidentType: string, sIncidentType: string, pIncidentEmail: string, sIncidentEmail: string, pIncidentSeverity: number, sIncidentSeverity: number, pIncidentFile: string, sIncidentFile: string, decision: string, pTrainerIncidentAction: string, sTrainerIncidentAction: string, opportunity: number, usability: number, pValueId: string, sValueId: string, pValueOpportunity: number, sValueUsability: number, pValueSeverity: number, sValueSeverity: number }
export type WorkSessionStudentEntity = { id: string, idWorkSession: string, name: string, email: string, owner?: string, stamp?: Date }
export type WorkTrainerEntity = { id: string, idWork: string, name: string, email: string, owner?: string, stamp?: Date }
