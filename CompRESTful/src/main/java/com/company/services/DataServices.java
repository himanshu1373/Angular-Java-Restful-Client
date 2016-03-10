package com.company.services;

import java.util.List;

import com.company.model.Company;
import com.company.model.Owner;
//import com.company.model.updateCompany;

public interface DataServices {
	public boolean addEntity(Company company) throws Exception;
	public boolean addOwnerEntity(Owner owner) throws Exception;
	public List<Owner> getOwnerList() throws Exception;
	public List<Owner> getOwnerById(long compid) throws Exception;
	public boolean deleteOwnerById(long ownerid) throws Exception;
	public boolean deleteOwnerByCompId(long compid) throws Exception;
	public boolean updateOwnerbyID(Owner owner) throws Exception;
	public boolean updateEntity(Company company) throws Exception;
	public Company getEntityById(long compid) throws Exception;
	public List<Company> getEntityList() throws Exception;
	public boolean deleteEntity(long compid) throws Exception;
}
