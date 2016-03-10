package com.company.controller;

import java.util.List;

import org.apache.log4j.Logger;
import com.company.model.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.model.Company;
import com.company.model.Owner;
//import com.company.model.updateCompany;
import com.company.services.DataServices;
import java.util.*;

@Controller
@RequestMapping("/company")
public class RestController {
	  
	  
	@Autowired
	DataServices dataServices;

	static final Logger logger = Logger.getLogger(RestController.class);

	/*--====================================================================--*/
	// Company Record CRUD Services
/*--====================================================================--*/
    //Select All company 
	@RequestMapping(value = "", method = RequestMethod.GET)
	public @ResponseBody
	List<Company> getCompany() {

		List<Company> companyList = null;
		try {
			companyList = dataServices.getEntityList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return companyList;
	}
	
	//Get selected company by Id
		@RequestMapping(value = "/{compid}", method = RequestMethod.GET)
		public @ResponseBody
		Company getCompany(@PathVariable("compid") long compid) {
			Company company = null;
			try {
				company = dataServices.getEntityById(compid);

			} catch (Exception e) {
				e.printStackTrace();
			}
			return company;
		}
		
		   //Add a Company Record
		@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody
		Status addCompany(@RequestBody Company company) {

			try {
				  
				dataServices.addEntity(company);

				return new Status(1, "Company added Successfully !");
			} catch (Exception e) {
				// e.printStackTrace();
				return new Status(0, e.toString());
			}

		}
		/* update a company record */
		@RequestMapping(value = "/update/{compid}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody
		Status updateMyCompany(@RequestBody Company company,@PathVariable("compid") long compid) {
			try {
				//dataServices.deleteEntity(compid);
				dataServices.updateEntity(company);

				return new Status(1, "Company added Successfully !");
			} catch (Exception e) {
				// e.printStackTrace();
				return new Status(0, e.toString());
			}

		}
    //Delete Selected Company
	@RequestMapping(value = "/{compid}", method = RequestMethod.DELETE)
	public @ResponseBody
	Status deleteCompany(@PathVariable("compid") long compid) {

		try {
			dataServices.deleteEntity(compid);
			return new Status(1, "Company deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}

	}
	
/*--====================================================================--*/
	// Owner Record CRUD Services
/*--====================================================================--*/
	/* List All owners */
	@RequestMapping(value = "/owner", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	List<Owner>  getOwner() {

		List<Owner> ownerList = null;
		try {
			ownerList = dataServices.getOwnerList();


		} catch (Exception e) {
			e.printStackTrace();
		}

		return ownerList;
	}

	//list selected owner
	@RequestMapping(value = "/owner/{compid}", method = RequestMethod.GET)
	public @ResponseBody
	List<Owner> getOwner2(@PathVariable("compid") long compid) {
		List<Owner> owner = null;
		try {
			owner = dataServices.getOwnerById(compid);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return owner;
	}
	
	/*Add a Business Owner */
	@RequestMapping(value = "/owner/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status addOwner(@RequestBody Owner owner) {

		try {
			  
			dataServices.addOwnerEntity(owner);

			return new Status(1, "Company added Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}
     //Delete selected owner of the company
	@RequestMapping(value = "/owner/{ownerid}", method = RequestMethod.DELETE)
	public @ResponseBody
	Status deleteOwner(@PathVariable("ownerid") long ownerid) {

		try {
			dataServices.deleteOwnerById(ownerid);
			return new Status(1, "Owner deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}
	}
	     //Delete All owner by the company Id
		@RequestMapping(value = "/owner/del/{compid}", method = RequestMethod.DELETE)
		public @ResponseBody
		Status deleteOwnerById(@PathVariable("compid") long compid) {

			try {
				dataServices.deleteOwnerByCompId(compid);
				return new Status(1, "Owner deleted Successfully !");
			} catch (Exception e) {
				return new Status(0, e.toString());
			}
	}
	
	/* update a owner record */
	@RequestMapping(value = "/owner/update/{ownerId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status updateMyCompany(@RequestBody Owner owner,@PathVariable("ownerId") long ownerId) {
		try {
			dataServices.updateOwnerbyID(owner);

			return new Status(1, "Owner Updated Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}
}
