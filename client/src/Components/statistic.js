import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Doughnut } from 'react-chartjs-2';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '80%',
		marginLeft: '10%',
		marginTop: '5%'
	},
	acordion: {
		margin: '10px'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	submit: {
		width: 'auto',
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Budget() {
	const classes = useStyles();
	const { user: currentUser } = useSelector((state) => state.auth);
	const [eventOpen, setEventOpen] = useState(false)
	const [addCategoryOpen, setAddCategoryOpen] = useState(false)
	const [kind, setKind] = useState([{ id: 0, type: 'חובה' }, { id: 1, type: 'זכות' }])
	const [actionCategory, setActionCategory] = useState([])
	const [actionCategoryForAdd, setActionCategoryForAdd] = useState({ action_category_description: null, id_building: null })
	const [action, setAction] = useState({
		kind_of_action: null, action_description: null, action_date: null, action_sum: null
		, id_tenant: null, id_building: null, id_action_category: null
	})
	const [response, setResponse] = useState(false)
	const [message, setMessage] = useState({ type: null, test: null })
	const [realDataForCanvas, setRealDataForCanvas] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
	const [realPlusDataForCanvas, setRealPlusDataForCanvas] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
	const [plusDataForCanvas, setPlusDataForCanvas] = useState()
	const [dataForCanvas, setDataForCanvas] = useState()
	const [inSetAction, setInSetAction] = useState(false)
	const [actionOfBuilding, setActionOfBuilding] = useState()
	const [monthArray, setMonthArray] = useState()
	const [avgActionForYear, setAvgActionForYear] = useState(0)
	const [avgActionForMonth, setAvgActionForMonth] = useState(0)
	const [years, setYears] = useState([{ id: 0, value: '2018' }, { id: 1, value: '2019' }, { id: 2, value: '2020' }, { id: 3, value: '2021' }])
	const [selectedYear, setSelectedYear] = useState(null)


	useEffect(() => {
		setDataForCanvas({
			labels: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
			datasets: [
				{
					data: realDataForCanvas,
					backgroundColor: [
						"rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)",
						"rgba(153, 102, 235, 0.6)", "rgba(255, 159, 132, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(255, 152, 154, 0.6)",
						"rgba(255, 124, 186, 0.6)", "rgba(255, 148, 175, 0.6)", "rgba(255, 192, 198, 0.6)", "rgba(255, 120, 132, 0.6)",
					]
				}
			]
		})
	}, [realDataForCanvas])
	useEffect(() => {
		setPlusDataForCanvas({
			labels: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
			datasets: [
				{
					data: realPlusDataForCanvas,
					backgroundColor: [
						"rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)",
						"rgba(153, 102, 235, 0.6)", "rgba(255, 159, 132, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(255, 152, 154, 0.6)",
						"rgba(255, 124, 186, 0.6)", "rgba(255, 148, 175, 0.6)", "rgba(255, 192, 198, 0.6)", "rgba(255, 120, 132, 0.6)",
					]
				}
			]
		})
	}, [realPlusDataForCanvas])
	useEffect(() => {
		const url = 'https://localhost:44350/api/ActionCategory/GetActionCategoryOfBuilding/'
		const newUrl = url + currentUser.id_building
		axios(newUrl, {
			method: "get",
			headers: {
				"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
			}
		}).then(res => {
			setActionCategory(res.data)
		})
	}, [response])

	useEffect(() => {
		if (selectedYear) {
			const url = 'https://localhost:44350/api/Action/GetActionsOfBuilding/'
			const newUrl = url + currentUser.id_building
			axios(newUrl, {
				method: "get",
				headers: {
					"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
				}
			}).then(res => {
				if (res.data) {
					setAvgActionForYear(res.data.filter(k => k.kind_of_action == false).reduce((pv, cv) => pv + cv.action_sum, 0) / 12)
					setAvgActionForMonth(res.data.filter(k => k.kind_of_action == false && new Date(k.action_date).getMonth() == new Date().getMonth()).reduce((pv, cv) => pv + cv.action_sum, 0))
					let a = []
					let arrayYear = res.data.filter(k => new Date(k.action_date).getFullYear() == selectedYear)
					if (arrayYear.length > 0) {
						for (let i = 0; i < arrayYear.length; i++) {
							a.push(arrayYear.map(t => ({ id: new Date(t.action_date).getMonth() + 1 }))[i].id)
						}
						let ss = (arrayYear.reduce((groups, game) => {
							let date = new Date(game.action_date).getMonth() + 1
							if (!groups[date]) {
								groups[date] = [];
							}
							groups[date].push(game);
							return groups;
						}, {}))
						setActionOfBuilding(ss)
						a = a.filter((b, c) => a.indexOf(b) == c)
						setMonthArray(a)
					}
					else {
						console.log(monthArray)
						setMonthArray(null)
					}
					let mon = res.data.filter(k => k.kind_of_action == false && new Date(k.action_date).getFullYear() == selectedYear).map(x => ({ day: x.action_date, value: Number(x.action_sum) }))
					let monn = mon && mon.map(x => ({ day: new Date(x.day).getMonth() + 1, value: x.value }))
					let summ = monn.reduce((acc, cur) => { acc[cur.day] = acc[cur.day] + cur.value || cur.value; return acc; }, {})
					let narr = Object.keys(summ).map((key) => [Number(key), summ[key]])
					let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					for (let i = 0; i < narr.length; i++) {
						arr[narr[i][0] - 1] = narr[i][1]
					}
					setRealDataForCanvas(arr)
					let mon2 = res.data.filter(k => k.kind_of_action == true && new Date(k.action_date).getFullYear() == selectedYear).map(x => ({ day: x.action_date, value: Number(x.action_sum) }))
					let monn2 = mon2 && mon2.map(x => ({ day: new Date(x.day).getMonth() + 1, value: x.value }))
					let summ2 = monn2.reduce((acc, cur) => { acc[cur.day] = acc[cur.day] + cur.value || cur.value; return acc; }, {})
					let narr2 = Object.keys(summ2).map((key) => [Number(key), summ2[key]])
					let arr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					for (let i = 0; i < narr2.length; i++) {
						arr2[narr2[i][0] - 1] = narr2[i][1]
					}
					setRealPlusDataForCanvas(arr2)
				}
			})
		}
	}, [selectedYear, inSetAction])
	console.log(actionOfBuilding, "actionBuilding")
	const saveNewCategory = () => {
		axios.post(`https://localhost:44350/api/ActionCategory/PostActionCategory`, actionCategoryForAdd)
			.then(res => {
				setResponse(!response)
				setAddCategoryOpen(false)
			})
	}
	const saveAction = () => {
		axios.post(`https://localhost:44350/api/Action/PostAction`, action)
			.then(res => {
				setMessage({ type: 'success', text: 'התווסף בהצלחה:)' })
				setEventOpen(false)
				setInSetAction(!inSetAction)
			})
	}
	useEffect(() => {
		if (message.type) {
			setTimeout(() => {
				setMessage({ type: null, text: null })
			}, 2000)
		}
	}, [message])

	console.log(actionOfBuilding, "actionOfBuilding")
	console.log(monthArray, "montharray")

	return (
		<div className={classes.root}>
			<div style={{ marginLeft: '90%' }}>
				<TextField
					select
					label=""
					value={years.value}
					onChange={(e) => { setSelectedYear(e.target.value) }}
					helperText="בחר שנה"
				>
					{years.map((option) => (
						<MenuItem key={option.id} value={option.value}>
							{option.value}
						</MenuItem>
					))}
				</TextField></div>
			{monthArray ? monthArray.map((month) => (
				<div className={classes.acordion} key={month}>
					<Accordion dir="rtl">
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography align="center" className={classes.heading}>  פעילות בחודש {dataForCanvas.labels[month - 1]} </Typography>
						</AccordionSummary>
						{actionOfBuilding && actionOfBuilding[month] ? actionOfBuilding[month].map((action) => (
							<AccordionDetails>
								<Typography variant="subtitle2" display="block">
									&nbsp; תאור  &nbsp; {action.action_description}
								</Typography>
								<Typography variant="subtitle2" display="block">
									&nbsp; הסכום  &nbsp; {action.action_sum}
								</Typography>
								<Typography variant="subtitle2" display="block">
									&nbsp; סוג ההוצאה  &nbsp; {action.kind_of_action ? ' זכות ' : ' חובה'}
								</Typography>
								<Typography variant="subtitle2" display="block">
									&nbsp; בתאריך  &nbsp; {action.action_date.split('T')[0]}
								</Typography>
							</AccordionDetails>
						)) : null}
					</Accordion>

				</div>
			)) : null}
			<Container component="main">
				<CssBaseline />
				<div className={classes.paper}>
					{avgActionForMonth > avgActionForYear ? <Alert severity="error">יש חריגה בהוצאות בחודש זה</Alert> : null}
					{currentUser && currentUser.status == 1 ? <Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => { setEventOpen(true) }}
					>הוספת פעילות (הוצאה או הכנסה)
        </Button> : null}
					<Dialog open={eventOpen} onClose={() => { setEventOpen(false) }} >
						<DialogTitle id="form-dialog-title">הוספת פעילות</DialogTitle>
						<DialogContent>
							<DialogContentText>
								וועד בית יקר, נא מלא פרטים        </DialogContentText>
							<TextField
								select
								label="select"
								value={kind.id}
								onChange={(e) => {
									setAction({
										kind_of_action: e.target.value, action_description: action.action_description, action_date: action.action_date,
										action_sum: action.action_sum, id_tenant: currentUser.id_tenant, id_building: currentUser.id_building, id_action_category: action.id_action_category
									})
								}}
								helperText="בחר סוג הוצאה"
							>
								{kind.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.type}
									</MenuItem>
								))}
							</TextField>
							<TextField
								select
								label="select"
								value={actionCategory ? actionCategory.id_action_category : actionCategory}
								onChange={(e) => {
									setAction({
										kind_of_action: action.kind_of_action, action_description: action.action_description, action_date: action.action_date,
										action_sum: action.action_sum, id_tenant: currentUser.id_tenant, id_building: currentUser.id_building, id_action_category: e.target.value
									})
								}}
								helperText="בחר קטגוריה"
							>
								{actionCategory ? actionCategory.map((option) => (
									<MenuItem key={option.id_action_category} value={option.id_action_category}>
										{option.action_category_description}
									</MenuItem>
								)) : null}
							</TextField>
							<Tooltip title="add category" aria-label="add">
								<IconButton onClick={() => { setAddCategoryOpen(true) }} color="primary">
									<AddCircleOutlineIcon />
								</IconButton>
							</Tooltip>
							<TextField
								autoFocus
								margin="dense"
								label="פרוט הפעילות"
								type="text"
								fullWidth
								onChange={(e) => {
									setAction({
										kind_of_action: action.kind_of_action, action_description: e.target.value, action_date: action.action_date,
										action_sum: action.action_sum, id_tenant: currentUser.id_tenant, id_building: currentUser.id_building, id_action_category: action.id_action_category
									})
								}} />
							<TextField
								margin="dense"
								id="date"
								label="תאריך"
								type="date"
								fullWidth
								onChange={(e) => {
									setAction({
										kind_of_action: action.kind_of_action, action_description: action.action_description, action_date: e.target.value,
										action_sum: action.action_sum, id_tenant: currentUser.id_tenant, id_building: currentUser.id_building, id_action_category: action.id_action_category
									})
								}} />
							<TextField
								margin="dense"
								label="סכום"
								type="number"
								fullWidth
								onChange={(e) => {
									setAction({
										kind_of_action: action.kind_of_action, action_description: action.action_description, action_date: action.action_date,
										action_sum: e.target.value, id_tenant: currentUser.id_tenant, id_building: currentUser.id_building, id_action_category: action.id_action_category
									})
								}} />
						</DialogContent>
						<DialogActions>
							<Button onClick={() => { setEventOpen(false) }} color="primary">
								ביטול
        </Button>
							<Button onClick={saveAction} color="primary">
								שמור
        </Button>
						</DialogActions>
					</Dialog>
					{message.type ? <Alert severity={message.type}>{message.text}</Alert> : null}
					<Dialog open={addCategoryOpen} onClose={() => { setAddCategoryOpen(false) }} >
						<DialogTitle id="add-dialog-title">הוספת קטגוריה</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="שם הקטגוריה"
								type="text"
								fullWidth
								onChange={(e) => { setActionCategoryForAdd({ action_category_description: e.target.value, id_building: currentUser.id_building }) }}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => { setAddCategoryOpen(false) }} color="primary"> ביטול</Button>
							<Button onClick={saveNewCategory} color="primary">שמור</Button>
						</DialogActions>
					</Dialog>
					<div>
						{dataForCanvas ? <div style={{ width: '400px', height: '300px' }} >
							<Typography align="center" component="h1" variant="h5">
								הוצאות
                </Typography>
							<Doughnut data={dataForCanvas} />
						</div> : null}
						{plusDataForCanvas ? <div style={{ width: '400px', height: '300px' }} >
							<Typography align="center" component="h1" variant="h5">
								הכנסות
                			</Typography>
							<Doughnut data={plusDataForCanvas} />
						</div> : null}
					</div>
				</div>
			</Container>
		</div>
	);
}
