package com.company.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.company.dao.DataDao;
import com.company.model.Company;
import com.company.model.Owner;
//import com.company.model.updateCompany;
public class DataServicesImpl implements DataServices {

	@Autowired
	DataDao dataDao;
	
	@Override
	public boolean addEntity(Company company) throws Exception {
		return dataDao.addEntity(company);
	}
	@Override
	public boolean addOwnerEntity(Owner owner) throws Exception {
		return dataDao.addOwnerEntity(owner);
	}

	@Override
	public List<Owner> getOwnerList() throws Exception {
		return dataDao.getOwnerList();
	}

	@Override
	public List<Owner> getOwnerById(long compid) throws Exception {
		return dataDao.getOwnerById(compid);
	}
	
	@Override
	public boolean deleteOwnerById(long ownerid) throws Exception {
		return dataDao.deleteOwnerById(ownerid);
	}
	
	@Override
	public boolean deleteOwnerByCompId(long compid) throws Exception {
		return dataDao.deleteOwnerByCompId(compid);
	}
	
	@Override
	public boolean updateOwnerbyID(Owner owner) throws Exception {
		return dataDao.updateOwnerbyID(owner);
	}
	@Override
	public boolean updateEntity(Company company) throws Exception {
		return dataDao.updateEntity(company);
	}
	@Override
	public Company getEntityById(long compid) throws Exception {
		return dataDao.getEntityById(compid);
	}

	@Override
	public List<Company> getEntityList() throws Exception {
		return dataDao.getEntityList();
	}

	@Override
	public boolean deleteEntity(long compid) throws Exception {
		return dataDao.deleteEntity(compid);
	}

}
